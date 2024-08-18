import DashboardLogo from './icon/DashboardLogo';
import Image from 'next/image';
import Link from 'next/link';
import { RecordAlertDialog } from './RecordAlertDialog';
import { useState } from 'react';

const styles = {
  ChildrenStyle: 'flex flex-col gap-6 w-[1200px] min-h-screen pb-10',
  ChildrenStyle2: 'flex flex-row gap-6 w-[1200px] min-h-screen pb-10',
  contentStyle: 'capitalize leading-6 text-[#0F172A]',
  contentStyle2: 'capitalize  leading-6 text-[#0F172A] font-semibold',
};
const content = ['dashboard', 'records'];

export const Layout = ({ children, ChildStyle = false }) => {
  const [currentIndex, setCurrentIndex] = useState();
  const handlerClick = (index) => {
    setCurrentIndex(index);
    console.log(currentIndex);
  };
  return (
    <div className="flex flex-col items-center bg-[#F3F4F6] gap-6">
      <div className="bg-white flex justify-center w-full">
        <div className="flex justify-between items-center py-[16px] w-[1200px]">
          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <DashboardLogo />
            </Link>
            {content.map((el, i) => (
              <Link
                href={el}
                className={
                  i === currentIndex
                    ? styles.contentStyle2
                    : styles.contentStyle
                }
                onClick={() => handlerClick(i)}
              >
                {el}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <RecordAlertDialog />
            <Image
              className="w-[40px] h-[40px] rounded-full object-cover"
              src="https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"
              width={40}
              height={40}
              alt="Avatar"
            />
          </div>
        </div>
      </div>
      <div
        className={ChildStyle ? styles.ChildrenStyle2 : styles.ChildrenStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
