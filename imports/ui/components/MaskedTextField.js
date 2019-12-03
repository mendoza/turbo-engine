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
  constructor(props) {
    super(props);

    this.state = { textmask: "" };
  }

  render() {
    const handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };

    const { textmask } = this.state;
    const { label, mask } = this.props;
    return (
      <div>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="formatted-text-mask-input">{label}</InputLabel>
          <Input
            value={textmask}
            onChange={handleChange("textmask")}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
            inputProps={{ mask }}
          />
        </FormControl>
      </div>
    );
  }
}

export default MaskedTextField;
