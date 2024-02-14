'use client';

import { useId, useState } from 'react';

import { Button, Card, CardContent, CardFooter } from '@twpay-qrcode/ui';

import {
  QRCodePaylaodForm,
  type QRCodePayloadFormValues,
} from './qr-code-payload-form';
import { TransferQRCodeImage } from './transfer-qr-code-image';

export default function Index() {
  const formId = useId();

  const [values, setValue] = useState<QRCodePayloadFormValues>();

  return (
    <main className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="text-6xl font-bold mb-4">Howazin</h1>
        <p className="text-l font-semibold">
          Generate QR code and share it with your friends to make they pay you
          easily.
          <br />
          Just fill in the form below and click generate.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Card className="w-[385px]">
          <CardContent>
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
            <Button type="submit" form={formId}>
              Generate
            </Button>
          </CardFooter>
        </Card>
        {values && (
          <Card className="w-[385px]">
            <CardContent>
              <TransferQRCodeImage
                className="mx-auto"
                size={180}
                level="L"
                payload={{
                  accountNo: values.accountNo,
                  amount: values.amount,
                  bankCode: values.bankCode,
                  message: values.note,
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button variant="outline">Back</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
