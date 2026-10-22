import { assetUrl } from "../src/asset-url";

export default function GitHubMark() {
  return <span className="github-mark" aria-hidden="true">
    <img className="github-mark-light" src={assetUrl("/assets/branding/github-invertocat-white.svg")} width="18" height="18" alt="" />
    <img className="github-mark-dark" src={assetUrl("/assets/branding/github-invertocat-black.svg")} width="18" height="18" alt="" />
  </span>;
}
