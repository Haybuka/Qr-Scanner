import { v4 as uuid } from 'uuid';

import { Html5Qrcode } from 'html5-qrcode';
import useScanInitiate from '../hooks/useScanInitiate';
import Button from './button';
import InfoText from './info';
import { decodedTextType } from '../App';
import { useState } from 'react';
import { _createBusCode } from '../api/createBusCode';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProMode = () => {
  const { initiate, startInitiateScan, stopInitiateScan } = useScanInitiate();
  const [scanResult, setScanResult] = useState<decodedTextType>(null);
  const [isSubmitting, setIssubmitting] = useState(false);

  const handleScan = (type: string) => {
    const html5QrCode = new Html5Qrcode('reader');
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    const sendBusCode = async (busId: string) => {
      const data = {
        transId: uuid(),
        busId,
      };

      const response = await _createBusCode(data);

      if (response?.error.status !== 400) {
        //SUCCESFULL
        toast.success(response.success.message);
      } else {
        //ERROR
        toast.error(response.error.message);
      }

      setIssubmitting(false);
    };

    const qrCodeSuccess = (decodedText: any, decodedResult: any) => {
      setIssubmitting(true);
      stopInitiateScan();
      setScanResult(decodedText);
      html5QrCode.stop();
      sendBusCode(decodedText);
    };

    const qrCodeError = (error: any) => {
      setIssubmitting(false);
    };

    if (type === 'start') {
      try {
        html5QrCode.start(
          { facingMode: { exact: 'environment' } },
          config,
          qrCodeSuccess,
          qrCodeError
        );
        // html5QrCode.start(
        //   { facingMode: 'environment' },
        //   config,
        //   qrCodeSuccess,
        //   qrCodeError
        // );
      } catch (error) {
        toast.error('No front camera detected');
        html5QrCode.start(
          { facingMode: 'environment' },
          config,
          qrCodeSuccess,
          qrCodeError
        );
      }
    } else {
      setIssubmitting(false);
    }
  };

  const handleScanStop = async () => {
    stopInitiateScan();
    window.location.reload();
  };
  const handleScanStart = () => {
    startInitiateScan();
    setIssubmitting(true);
    handleScan('start');
  };

  return (
    <section>
      <div id="reader" className="overflow-hidden w-[380px] sm:w-[600px]"></div>
      {scanResult && (
        <>
          <InfoText text={`bus code : ${scanResult}`} />
          {isSubmitting && <div className="loader"></div>}
        </>
      )}
      {initiate ? (
        <Button text={'Stop Scan'} handleClick={handleScanStop} />
      ) : (
        <>
          <InfoText text="Click the button to start scanning" />

          <Button text={'Scan a Bus'} handleClick={handleScanStart} />
        </>
      )}
    </section>
  );
};

export default ProMode;
