import { FC, useEffect, useState, useMemo } from "react";

import axios from "axios";
import ScanTableBrowser from "./Browser/ScanTableBrowser";
import useCheckMobileScreen from "../../common/actions/UseCheckMobileScreen";
import ScanTableMobileViewAll from "./Mobile/ScanTableMobileViewAll";
import ScanTableBrowserSummarised from "./Browser/ScanTableBrowserSummarised";
import ScanTableMobileSummarised from "./Mobile/ScanTableMobileSummarised";

import { TabView, TabPanel } from "primereact/tabview";
import { SummarisedModel } from "./model/ScanModel";
import { mapSummariseObject } from "./Mobile/actions";
import { Button } from "primereact/button";
import { BreadCrumb } from 'primereact/breadcrumb';

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

    return () => {
      setPosts([]);
    };
  }, []);

  const summarisedData: SummarisedModel[] = useMemo(() => {
    return mapSummariseObject(posts);
  }, [posts]);

  return (
    <div className="section-container">
      <section className="header">
        <h1>Scan</h1>
      </section>
      <section className="section">
        <div className="scan-buttons">
          <Button
            label="Scan In"
            className="p-button-outlined p-button-secondary"
          />
        </div>
        <div className="scan-buttons">
          <Button
            label="Scan Out"
            className="p-button-outlined p-button-secondary"
          />
        </div>
      </section>
      <section className="header">
        <h1>Transactions</h1>
      </section>
      <section className="section">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="View All">
            {isMobile ? (
              <ScanTableMobileViewAll posts={posts} />
            ) : (
              <ScanTableBrowser posts={posts} />
            )}
          </TabPanel>
          <TabPanel header="Summarised view">
            {isMobile ? (
              <ScanTableMobileSummarised data={summarisedData} />
            ) : (
              <ScanTableBrowserSummarised data={summarisedData} />
            )}
          </TabPanel>
        </TabView>
      </section>
    </div>
  );
};

export default Scan;
