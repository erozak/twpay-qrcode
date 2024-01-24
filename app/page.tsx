'use client';

import { QRCodePaylaodForm } from '@twpay-qrcode/components/qr-code-payload-form';
import { Button } from '@twpay-qrcode/ui';

export default async function Index() {
  return (
    <main className="container py-16">
      <h1 className="text-3xl text-center mb-8 font-bold">
        Taiwan Pay QR Code Generator
      </h1>
      <div className="flex items-stretch border rounded-lg py-6 bg-white">
        <QRCodePaylaodForm
          className="flex-1 px-8 border-r border-input"
          onSubmit={(values) => {
            console.log('submit', values);
          }}
        >
          <div className="col-start-4 col-span-1 flex flex-row-reverse gap-4">
            <Button type="submit">Submit</Button>
            <Button type="reset" variant="ghost">
              Reset
            </Button>
          </div>
        </QRCodePaylaodForm>
        <div className="flex items-center justify-center px-8">
          <div className="flex items-center justify-center w-[320px] h-[320px] border-dashed border rounded-md">
            <p className="text-muted-foreground">TaiwanPay QR Code</p>
          </div>
        </div>
      </div>
    </main>
  );
}
