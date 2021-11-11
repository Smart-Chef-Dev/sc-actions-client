import { memo } from "react";
import ContentLoader from "react-content-loader";

const CategoryLoader = () => (
  <ContentLoader
    speed={2}
    width={115}
    height={26}
    viewBox="0 0 115 26"
    backgroundColor="var(--loader-background-color)"
    foregroundColor="var(--loader-foreground-color)"
  >
    <rect x="0" y="0" rx="0" ry="0" width="115" height="26" />
  </ContentLoader>
);

export default memo(CategoryLoader);
