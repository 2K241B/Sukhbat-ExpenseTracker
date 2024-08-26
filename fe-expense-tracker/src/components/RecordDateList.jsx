import { useEffect, useState } from 'react';
import CheckboxList from './CheckboxList';
import CheckboxRecord from './CheckboxRecord';
import ListLogo from './icon/ListLogo';

export const RecordDateList = ({
  recordData,
  currency,
  transType,
  categoryValue,
  typeValue,
}) => {
  const [recordFiltered, setRecordFiltered] = useState(recordData);
  const [filterData, setFilterData] = useState(recordFiltered);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    setRecordFiltered(
      recordData.filter((el) => el.transaction_type === typeValue)
    );
    setFilterData(recordData.filter((el) => el.transaction_type === typeValue));
    if (typeValue === 'ALL') {
      setRecordFiltered(recordData);
      setFilterData(recordData);
    }
    total();
  }, [typeValue]);
  useEffect(() => {
    setRecordFiltered(
      filterData.filter((el) => el.category_id === categoryValue)
    );
    total();
  }, [categoryValue]);
  useEffect(() => {
    setRecordFiltered(recordData);
  }, []);
  const dateToTime = (d) => {
    const date = new Date(d);
    console.log(date);
    const gettime = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const getMunites = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    console.log(getMunites);
    return [`${gettime}:${getMunites}`];
  };
  const total = () => {
    setTotalAmount(recordFiltered.reduce((acc, el) => (acc += el.amount), 0));
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full h-fit py-3 px-6 rounded-[12px] border-[1px] flex items-center justify-between bg-white">
        <CheckboxRecord id={'selectAll'} content={'Select All'} />
        <p>{totalAmount}</p>
      </div>
      <h1>Today</h1>
      <div className="flex flex-col gap-3">
        {recordFiltered &&
          recordFiltered.map((el) => (
            <CheckboxList
              id={'bla'}
              content={
                <div className="flex items-center gap-4">
                  <ListLogo />
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[#000] font-semibold ">{el.name}</h1>
                    <p className="text-[12px] leading-4 text-[#6B7280]">
                      {dateToTime(el.createdat)}
                    </p>
                  </div>
                </div>
              }
              transType={el.transaction_type}
              amount={el.amount}
              currency={currency}
            />
          ))}
      </div>
    </div>
  );
};

export default RecordDateList;
