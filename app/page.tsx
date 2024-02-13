'use client';

import { QRCodePaylaodForm } from '@twpay-qrcode/components/qr-code-payload-form';
import { Button, Card, CardContent, CardFooter } from '@twpay-qrcode/ui';
import { useId } from 'react';

export default function Index() {
  const formId = useId();

  return (
    <main className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Howazin</h1>
        <p className="text-xl">
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
              onSubmit={(values) => {
                console.log('submit', values);
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
      </div>
    </main>
  );
}
