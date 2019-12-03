import React, { PureComponent } from "react";
import { Input, FormControl, InputLabel } from "@material-ui/core";
import MaskedInput from "react-text-mask";

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
};
class MaskedTextField extends PureComponent {
  render() {
    const { label, mask, value, onChange, name } = this.props;
    return (
      <div>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="formatted-text-mask-input">{label}</InputLabel>
          <Input
            name={name}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
            inputProps={{
              mask,
              value,
              name,
              onChange,
            }}
          />
        </FormControl>
      </div>
    );
  }
}

export default MaskedTextField;
