'use client';

import { useId, useState } from 'react';

import { Button, Card, CardContent, CardFooter } from '@twpay-qrcode/ui';

import {
  QRCodePaylaodForm,
  type QRCodePayloadFormValues,
} from './qr-code-payload-form';
import { TransferQRCode } from './transfer-qr-code';
import { Separator } from '@twpay-qrcode/components/ui';
import { cn } from 'utils/cn';

export default function Index() {
  const formId = useId();

  const [values, setValue] = useState<QRCodePayloadFormValues>();

  return (
    <div className="flex justify-center items-center">
      <Card
        className={cn(
          'flex flex-row w-full max-w-[770px]',
          values ? 'max-w-[770px]' : 'max-w-[385px]'
        )}
      >
        <div className="flex flex-col flex-1">
          <CardContent className="flex-1">
            <QRCodePaylaodForm
              id={formId}
              initialValues={values}
              onSubmit={(values) => {
                setValue(values);
              }}
            />
          </CardContent>
          <CardFooter className="flex gap-4 justify-between items-stretch xs:flex-row flex-col">
            <Button type="reset" variant="ghost" form={formId}>
              Reset
            </Button>
          </CardFooter>
        </div>
        {values && (
          <>
            <div className="py-6">
              <Separator orientation="vertical" />
            </div>
            <div className="flex flex-col flex-1">
              <CardContent className="flex flex-1 justify-center items-center">
                <TransferQRCode
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
                <Button variant="outline">Share</Button>
                <Button variant="outline">Download</Button>
              </CardFooter>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
