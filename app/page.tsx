'use client';

import { useId, useState } from 'react';

import { Button, Card, CardContent, CardFooter } from '@twpay-qrcode/ui';

import {
  QRCodePaylaodForm,
  type QRCodePayloadFormValues,
} from './qr-code-payload-form';
import { TransferQRCodeImage } from './transfer-qr-code-image';
import { Separator } from '@twpay-qrcode/components/ui';

export default function Index() {
  const formId = useId();

  const [values, setValue] = useState<QRCodePayloadFormValues>();

  return (
    <div className="flex justify-center items-center">
      <Card className="flex flex-row">
        <div className="flex flex-col w-[385px]">
          <CardContent className="flex-1">
            <QRCodePaylaodForm
              id={formId}
              initialValues={values}
              onSubmit={(values) => {
                setValue(values);
              }}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="reset" variant="ghost" form={formId}>
              Reset
            </Button>
            <Button type="submit" variant="default" form={formId}>
              Create
            </Button>
          </CardFooter>
        </div>
        {values && (
          <>
            <div className="py-6">
              <Separator orientation="vertical" />
            </div>
            <div className="flex flex-col w-[385px]">
              <CardContent className="flex flex-1 justify-center items-center">
                <TransferQRCodeImage
                  size={218}
                  level="L"
                  payload={{
                    accountNo: values.accountNo,
                    amount: values.amount,
                    bankCode: values.bankCode,
                    message: values.note,
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="ghost">Share</Button>
                <Button variant="ghost">Download</Button>
              </CardFooter>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
