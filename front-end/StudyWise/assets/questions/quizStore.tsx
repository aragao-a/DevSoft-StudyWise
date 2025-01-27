export let selectedOptions: string[] = [];

export const addOption = (option: string) => {
  selectedOptions.push(option);
};

export const resetOptions = () => {
  selectedOptions = [];
};
