export type RadioButtonProps = {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};
