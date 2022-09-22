import { SNACKSHOP_PROFILE_TABS } from "features/shared/constants";
import { Tab } from "features/shared/presentation/components";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { ReactNode } from "react";
import { ShopProfileTabsProps } from "../../../shop/presentation/components/shop-profile-tabs";

interface ProfileContainerProps extends ShopProfileTabsProps {
  title: string;
  children: ReactNode;
}

export function ProfileContainer(props: ProfileContainerProps) {
  return (
    <main className="bg-paper">
      <PageTitleAndBreadCrumbs
        home={{
          title: "Snackshop",
          url: "/delivery",
        }}
        className="lg:h-[200px]"
        title={props.title}
        pageTitles={[
          { name: "Products", url: "/delivery/products" },
          { name: props.title },
        ]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="container">
            <Tab tabs={SNACKSHOP_PROFILE_TABS} activeTab={props.activeTab}>
              <div className="space-y-6">{props.children}</div>
            </Tab>
          </div>
        </div>
      </section>
    </main>
  );
}
