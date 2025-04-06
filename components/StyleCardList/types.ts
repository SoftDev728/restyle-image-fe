export type StyleOptionType = {
  id: string;
  label: string;
  icon: React.JSX.Element;
  gradient: string[];
};

export type StyleCardListProps = {
  styleOptions: StyleOptionType[];
  selectedStyle: string | null;
  onChangeStyle: (id: string) => void;
};
