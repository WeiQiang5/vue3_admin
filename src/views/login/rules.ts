export const validatePassword = (
  _rule: unknown,
  value: string,
  callback: (arg0: Error | undefined) => void
) => {
  console.log(value);

  if (value.length < 6) {
    callback(new Error("密码不能少于6位"));
  } else {
    callback(undefined);
  }
};
