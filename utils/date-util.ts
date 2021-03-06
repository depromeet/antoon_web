export const getDateFormatter = (date: string) => {
  return Date.parse(date);
};

export const countDownFormatter = () => {
  const targetTime = new Date();
  targetTime.setMonth(targetTime.getMonth() + 1);
  targetTime.setHours(0, 0, 0);
  return targetTime;
};

export const getReturnValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
