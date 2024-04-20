'use client';

import { Container, Text, Space } from '@mantine/core';

// import { useId, useState } from 'react';

// import { Button, Card, CardContent, CardFooter } from '@twpay-qrcode/ui';

import {
  QRCodePaylaodForm,
  type QRCodePayloadFormValues,
} from './qr-code-payload-form';
// import { TransferQRCode } from './transfer-qr-code';
// import { Separator } from '@twpay-qrcode/components/ui';
// import { cn } from 'utils/cn';
// import { QRCodePlaceholder } from './qr-code-placeholder';

// export default function Index() {
//   const formId = useId();

//   const [values, setValue] = useState<QRCodePayloadFormValues>();

//   return (
//     <div className="flex justify-center items-center">
//       <Card className="flex flex-row w-full max-w-[770px]">
//         <div className="flex flex-col flex-1">
//           <CardContent className="flex-1">
//             <QRCodePaylaodForm
//               id={formId}
//               initialValues={values}
//               onSubmit={(values) => {
//                 setValue(values);
//               }}
//             />
//           </CardContent>
//           <CardFooter className="flex gap-4 justify-between items-stretch xs:flex-row flex-col">
//             <Button type="reset" variant="ghost" form={formId}>
//               Reset
//             </Button>
//           </CardFooter>
//         </div>
//         <div className="py-6">
//           <Separator orientation="vertical" />
//         </div>
//         <div className="flex flex-col flex-1">
//           <CardContent className="flex flex-1 justify-center items-center">
//             {values ? (
//               <TransferQRCode
//                 size={218}
//                 level="L"
//                 payload={{
//                   accountNo: values.accountNo,
//                   amount: values.amount,
//                   bankCode: values.bankCode,
//                   message: values.note,
//                 }}
//               />
//             ) : (
//               <QRCodePlaceholder size={218} className="w-[218px] h-[218px]">
//                 Fill bank code
//                 <br />
//                 and account number
//                 <br /> to create QR Code
//               </QRCodePlaceholder>
//             )}
//           </CardContent>
//           <CardFooter className="flex justify-center gap-4">
//             <Button variant="outline" disabled={!values}>
//               Share
//             </Button>
//             <Button variant="outline" disabled={!values}>
//               Download
//             </Button>
//           </CardFooter>
//         </div>
//       </Card>
//     </div>
//   );
// }

export default function Index() {
  return (
    <>
      <Container>
        <Description />
      </Container>
      <Space h="lg" />
      <Container>
        <QRCodePaylaodForm
          onSubmit={(values) => {
            console.log('!!', values);
          }}
        />
      </Container>
    </>
  );
}

function Description() {
  return (
    <Text fw={500}>
      Generate QR code and share it with your friends to make they pay you
      easily.
      <br />
      Just fill in the form below and click generate.
    </Text>
  );
}
