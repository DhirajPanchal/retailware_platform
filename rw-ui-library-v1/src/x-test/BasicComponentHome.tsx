import { RwButton } from "../v1/component/basic/RwButton";
import { RwCheckbox } from "../v1/component/basic/RwCheckbox";
import { RwCombo } from "../v1/component/basic/RwCombo";
import { RwRadio } from "../v1/component/basic/RwRadio";
import { RwPanel } from "../v1/component/RwPanel";
import RwBusySpinner from "../v1/control/RwBusySpinner";

export default function BasicComponentHome() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <RwButton>Default</RwButton>
          <RwButton rounded>Rounded</RwButton>
        </div>
        <div className="flex gap-4">
          <RwButton solid>Solid</RwButton>
          <RwButton solid rounded>
            Solid Rounded
          </RwButton>
        </div>
        <div className="flex gap-4">
          <RwButton theme>Themed Default</RwButton>
          <RwButton theme rounded>
            {" "}
            Themed Rounded
          </RwButton>
        </div>
        <div className="flex gap-4">
          <RwButton theme solid>
            Themed Solid
          </RwButton>
          <RwButton theme solid rounded>
            Themed Solid Rounded
          </RwButton>
        </div>

        <RwButton>
          With RwBusySpinner
          <RwBusySpinner />
        </RwButton>
        <div className="flex gap-4">
          <RwBusySpinner iconClassName="busy-spinner-icon-large" />
          <RwBusySpinner isLoading={true} />
          <RwBusySpinner isError={true} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">Radio Group</span>
          <RwRadio name="group1" value="a" label="Option A" />
          <RwRadio name="group1" value="b" label="Option B" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">Checkbox</span>
          <RwCheckbox value="agree" label="I agree to terms" />
          <RwCheckbox value="updates" label="Subscribe to updates" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <RwCombo
          label="Select Fruit"
          options={[
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Cherry", value: "cherry" },
            { label: "Orange", value: "orange" },
            { label: "Pineapple", value: "pineapple" },
          ]}
        />

        <RwPanel
          title="User Preferences"
          icon={<span>👤</span>}
          collapsible
          footer={
            <div className="text-sm text-right">Last updated 2 mins ago</div>
          }
        >
          <div className="p-4">
            <p>
              Body is fully user-managed. You can add forms, tables, or nested
              panels here.
            </p>
          </div>
        </RwPanel>

        <RwPanel
          title="User Preferences"
          icon={<span>👤</span>}
          collapsible
          rounded
          solid
          footer={
            <div className="text-sm text-right">Last updated 2 mins ago</div>
          }
        >
          <div className="p-4">
            <p>
              Body is fully user-managed. You can add forms, tables, or nested
              panels here.
            </p>
          </div>
        </RwPanel>

        <RwPanel
          title="User Preferences"
          icon={<span>👤</span>}
          collapsible
          theme
          footer={
            <div className="text-sm text-right">Last updated 2 mins ago</div>
          }
        >
          <div className="p-4">
            <p>
              Body is fully user-managed. You can add forms, tables, or nested
              panels here.
            </p>
          </div>
        </RwPanel>

        <RwPanel
          title="User Preferences"
          icon={<span>👤</span>}
          collapsible
          theme
          rounded
          solid
          footer={
            <div className="text-sm text-right">Last updated 2 mins ago</div>
          }
        >
          <div className="p-4">
            <p>
              Body is fully user-managed. You can add forms, tables, or nested
              panels here.
            </p>
          </div>
        </RwPanel>
      </div>
    </div>
  );
}
