import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { performProductAction } from "~/productActions.server";
import type { ProductAction } from "~/types/enums";
import { pollForVersionUpdates } from "~/versionActions";

const DefaultActionFunction: ActionFunction = async (props) => {
  const request = props.request;
  const formData = new URLSearchParams(await request.text());
  const actionType = formData.get("actionType");
  console.log("formData: ", formData);

  try {
    switch (actionType) {
      case "performProductAction":
        const updatedProducts = await performProductAction(
          JSON.parse(formData.get("products")!),
          formData.get("productStatusAction") as ProductAction
        );
        return json({ updatedProducts: updatedProducts }, { status: 200 });
      case "pollForVersionUpdates":
        const updatedVersions = await pollForVersionUpdates(JSON.parse(formData.get("versionIDs")!));
        console.log("updatedVersions: ", updatedVersions);
        return json({ updatedVersions: updatedVersions }, { status: 200 });
      default:
        return json({});
    }
  } catch (error) {
    console.log("error on action: ", actionType, error);
    return json({ error: error }, { status: 400 });
  }
};

export default DefaultActionFunction;
