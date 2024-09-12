import { useAppSelector } from "@/app/app.hooks";
import TabHeader from "./components/tab_header";
import { motion } from "framer-motion";
import SlidingComp from "@/components/sliding_comp";
import { ProductPageSlider } from "@/app/features/page_slider.slice";
import ViewProduct from "./components/products/components/view_product";

export default function Products() {
  const { productPageSlider } = useAppSelector((state) => state.pageSlider);
  return (
    <div>
      {productPageSlider == ProductPageSlider.productPageClose ? (
        <>
          <TabHeader />
        </>
      ) : (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <SlidingComp
            children={
              productPageSlider == ProductPageSlider.ViewProductPage ? (
                <ViewProduct />
              ) : null
            }
          />
        </motion.div>
      )}
    </div>
  );
}
