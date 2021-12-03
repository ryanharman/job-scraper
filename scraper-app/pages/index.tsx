import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Card, Layout, Menu, Skeleton, Statistic } from "antd";
import { IndeedResponseObject } from "../../scraper-api/src/utils/config";

const { Header, Content } = Layout;

export default function Home() {
  const [data, setData] = useState<IndeedResponseObject[]>([]); // TODO: Use the jobs type here
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3001").then((jobs) => {
      setData(jobs.data[0]);
      console.log(jobs);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Job Scraper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>Home</Menu.Item>
          </Menu>
        </Header>
        <Content className="p-12">
          <Skeleton loading={loading} active>
            <div className="flex flex-wrap gap-4">
              {data.map((job: IndeedResponseObject) => {
                return (
                  <Card
                    title={job.jobTitle}
                    extra={
                      <a href={job.jobSiteLink} target="_blank">
                        View
                      </a>
                    }
                    className="w-96"
                  >
                    <div className="flex flex-col gap-4">
                      <Statistic
                        title="Company"
                        value={job.company}
                        valueStyle={{ fontSize: "16px" }}
                      />
                      <Statistic
                        title="Location"
                        value={job.location}
                        valueStyle={{ fontSize: "16px" }}
                      />
                      <Statistic
                        title="Salary"
                        value={job.salary}
                        valueStyle={{ fontSize: "16px" }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </Skeleton>
        </Content>
      </Layout>
    </div>
  );
}
