"use client";

import { useProduct } from "@/context/ProductContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { RenderProduct } from "../RenderProduct";
import { ProductsPagination } from "../ProductsPagination";
import { CiWarning } from "react-icons/ci";
import { MdErrorOutline, MdBorderAll } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

import "./ProductsTabs.css";
import useScreenSize from "@/hooks/UseScreenSize";
import { NoProducts } from "./NoProducts";
import { TabPanelContent } from "./TabPanelContent";
import { TabContent } from "./TabContent";

export const ProductsTabs = () => {
  const { allProducts, productToExpire, expiredProducts, missingProducts } = useProduct();

  const [width] = useScreenSize();

  const tabWidth = { width: width < 481 ? "100%" : "auto" };

  return (
    <Tabs>
      <TabList>
        <Tab style={tabWidth}>
          <TabContent
            productArray={allProducts}
            icon={<MdBorderAll />}
            title="Todos los productos"
          />
        </Tab>
        <Tab style={tabWidth}>
          <TabContent
            productArray={productToExpire}
            icon={<CiWarning />}
            title="Productos por vencer"
          />
        </Tab>
        <Tab style={tabWidth}>
          <TabContent
            productArray={expiredProducts}
            icon={<MdErrorOutline />}
            title="Productos vencidos"
          />
        </Tab>
        <Tab style={tabWidth}>
          <TabContent
            productArray={missingProducts}
            icon={<RxCrossCircled />}
            title="Productos faltantes"
          />
        </Tab>
      </TabList>

      <TabPanel>
        <TabPanelContent
          productsArray={allProducts}
          text="No hay productos"
          title="Todos los productos"
        />
      </TabPanel>
      <TabPanel>
        <TabPanelContent
          productsArray={productToExpire}
          text="No hay productos por vencer"
          title="Productos por vencer"
        />
      </TabPanel>
      <TabPanel>
        <TabPanelContent
          productsArray={expiredProducts}
          text="No hay productos vencidos"
          title="Productos vencidos"
        />
      </TabPanel>
      <TabPanel>
        <TabPanelContent
          productsArray={missingProducts}
          text="No hay productos faltantes"
          title="Productos faltantes"
        />
      </TabPanel>
    </Tabs>
  );
};
