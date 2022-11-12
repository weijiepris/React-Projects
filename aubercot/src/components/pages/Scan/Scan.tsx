import { FC, useEffect, useState } from "react";
import axios from "axios";
import ScanTableBrowser from "./ScanTableBrowser";
import ScanTableMobile from "./ScanTableMobile";
import { TabView, TabPanel } from "primereact/tabview";
import useCheckMobileScreen from "../../common/actions/UseCheckMobileScreen";

interface Props {
  alert: Function;
}
const Scan: FC<Props> = () => {
  const [posts, setPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="section-container">
      <section className="header">
        <h1>Scan</h1>
      </section>
      <section className="section">
        <div className="summary-items">
          <div>Scan In</div>
        </div>
        <div className="summary-items" data-pr-tooltip={"test"}>
          <div className="profits">Scan Out</div>
        </div>
      </section>
      <section className="section">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="View All">
            {isMobile ? (
              <ScanTableMobile posts={posts} />
            ) : (
              <ScanTableBrowser posts={posts} />
            )}
          </TabPanel>
          <TabPanel header="Summarised view">
            <TabPanel header="Header III">Content III</TabPanel>
          </TabPanel>
        </TabView>
      </section>
    </div>
  );
};

export default Scan;
