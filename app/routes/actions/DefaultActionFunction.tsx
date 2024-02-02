import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { sampleImages } from "~/SampleData";
import { getProductImages, performProductAction } from "~/productActions.server";
import type { ProductAction } from "~/types/enums";
import { VersionAction } from "~/types/enums";
import { performVersionAction, pollForVersionUpdates, updateVersion } from "~/versionActions.server";

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
        const versionAction = formData.get("versionAction") as VersionAction;
        const updatedVersions2 = await performVersionAction(JSON.parse(formData.get("versions")!), versionAction);
        console.log("updatedVersions2: ", updatedVersions2);
        return json(
          {
            updatedVersions: updatedVersions2,
            versionAction: versionAction,
          },
          { status: 200 }
        );
      case "getProductImages":
        console.log("getProductImages");
        return json({ productImages: await getProductImages(formData.get("productId")!) }, { status: 200 });
      case "updateVersion":
        const updatedVersion = await updateVersion(
          JSON.parse(formData.get("originalVersion")!),
          formData.get("updatedTitle")!,
          formData.get("updatedDescription")!,
          formData.get("updatedImageUrl")!
        );
        return json({ updatedVersions: [updatedVersion], versionAction: VersionAction.Update }, { status: 200 });

      default:
        return json({});
    }
  } catch (error) {
    console.log("error on action: ", actionType, error);
    return json({ error: error }, { status: 400 });
  }
};

export default DefaultActionFunction;
