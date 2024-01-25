import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { performProductAction } from "~/productActions.server";
import type { ProductAction, VersionAction } from "~/types/enums";
import { performVersionAction, pollForVersionUpdates } from "~/versionActions.server";

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
      case "performVersionAction":
        const updatedVersions2 = await performVersionAction(
          JSON.parse(formData.get("versions")!),
          formData.get("versionAction") as VersionAction
        );
        console.log("updatedVersions2: ", updatedVersions2);
        return json(
          {
            updatedVersions: updatedVersions2,
          },
          { status: 200 }
        );
      default:
        return json({});
    }
  } catch (error) {
    console.log("error on action: ", actionType, error);
    return json({ error: error }, { status: 400 });
  }
};

export default DefaultActionFunction;
