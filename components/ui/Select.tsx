import clsx from "clsx";
import { forwardRef, useId } from "react";
import AsyncSelect from "react-select/async";
import ReactSelect from "react-select";

const Select = forwardRef<HTMLSelectElement, any>((props, ref) => {
  const controlStyles = {
    base: "border rounded-md bg-transparent hover:cursor-pointer text-sm w-full px-2 py-0 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    focus: "ring-1 ring-gray-400 dark:ring-gray-800",
    nonFocus: "border-input",
  };
  const placeholderStyles = "text-gray-400";
  const selectInputStyles = "text-primary";
  const valueContainerStyles = "p-1 gap-1";
  const singleValueStyles = "text-primary ml-1";
  const indicatorsContainerStyles = "p-1 gap-1";
  const indicatorSeparatorStyles = "bg-input";
  const dropdownIndicatorStyles =
    "p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-600 rounded-md";
  const menuStyles =
    "p-1 mt-2 border border-input bg-background rounded-md text-sm z-10 ";
  const noOptionsMessageStyles = "text-foreground py-1 text-sm";
  const optionStyles = {
    base: "hover:cursor-pointer px-3 py-2 rounded text-primary",
    focus: "bg-gray-100 dark:bg-gray-900",
    selected: "bg-gray-200 dark:bg-gray-800",
  };
  const Selected = !!props.isAsync ? AsyncSelect : ReactSelect;
  return (
    <Selected
      instanceId={useId()}
      ref={ref}
      unstyled
      {...props}
      classNames={{
        control: ({ isFocused }: { isFocused: boolean }) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        option: ({
          isFocused,
          isSelected,
        }: {
          isFocused: boolean;
          isSelected: boolean;
        }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
    />
  );
});

Select.displayName = "Select";

export default Select;
