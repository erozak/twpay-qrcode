import { URL, fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as stream from 'node:stream';
import * as fs from 'node:fs/promises';
import * as csv from 'csv';
import prettier from 'prettier';

// #region Main

main({
  /**
   * {@link https://www.fisc.com.tw/TC/OpenDatas?Caid=88ca8809-ac4d-4e5f-a36a-add364ce5f50&CaStyleId=6 | 財金資訊股份有限公司 - 開放資料 - 共通性 - 跨行業務參加金融機構一覽 }
   */
  dataUrl: 'https://www.fisc.com.tw/TC/OPENDATA/Comm1_MEMBER.csv',
  targetTypes: [
    '跨行自動化服務機器業務(金融卡)',
    '通匯業務-入戶電匯',
    '網路ATM',
  ],
  targetPath: fileURLToPath(
    new URL('../generated/bank-codes.json', import.meta.url),
  ),
});

// #endregion

async function main({ dataUrl, targetTypes, targetPath }) {
  const data = await fetchBankCodeCSV(dataUrl)
    .then((res) => stream.Readable.fromWeb(res.body).pipe(csv.parse()))
    .then((res) => toBankCodeMap(res, { targetTypes }))
    .then(toData);

  await writeFile(targetPath, data);

  console.info(
    'Bank codes generated successfully. The file is saved at:\n',
    targetPath,
  );
}

async function fetchBankCodeCSV(dataUrl) {
  const res = await fetch(dataUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch bank codes: [${res.status}] ${res.statusText}`,
    );
  }

  return res;
}

function toBankCodeMap(readable, config) {
  return readable.reduce((acc, [type, code, name]) => {
    if (!code || !name || !config.targetTypes.includes(type)) return acc;

    acc[code] = { code, name };

    return acc;
  }, {});
}

function toData(bankCodeMap) {
  const codes = Object.values(bankCodeMap).sort((a, b) =>
    a.code.localeCompare(b.code),
  );

  return prettier.format(JSON.stringify(codes), { parser: 'json' });
}

async function writeFile(pathname, data) {
  await fs.mkdir(path.dirname(pathname), {
    recursive: true,
  });

  await fs.writeFile(pathname, data, {
    encoding: 'utf-8',
  });
}
