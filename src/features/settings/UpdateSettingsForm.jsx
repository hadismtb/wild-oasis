import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import useEditSettings from "./useEditSettings.js";

function UpdateSettingsForm() {
  // eslint-disable-next-line no-unused-vars
  const {
    isLoading,
    settings: {
      minBokingLength,
      maxBokingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  // eslint-disable-next-line no-unused-vars
  const { isEditing, editSetting } = useEditSettings();

  const handleUpdate = (e, fieldName) => {
    const { value } = e.target;

    if (!value) return;

    editSetting({ [fieldName]: Number(value) });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isEditing}
          defaultValue={minBokingLength}
          onBlur={(e) => handleUpdate(e, "minBokingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isEditing}
          defaultValue={maxBokingLength}
          onBlur={(e) => handleUpdate(e, "maxBokingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isEditing}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isEditing}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
