import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Card, Layout, Menu, Skeleton, Statistic, Input, Form, Button, Divider } from "antd";
import { IndeedResponseObject } from "../../scraper-api/src/utils/config";

const { Header, Content } = Layout;

export default function Home() {
  const [data, setData] = useState<IndeedResponseObject[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3001").then((jobs) => {
      setData(jobs.data[0]);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    axios
      .get(`http://localhost:3001?role=${values.role}&location=${values.location}`)
      .then((jobs) => {
        setData(jobs.data[0]);
        console.log("yeet, ", jobs);
        setLoading(false);
      })
      .catch((e) => console.log("yeeteth"));
  };

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
          <Form
            name="searchParams"
            wrapperCol={{ span: 8 }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={(values) => handleSubmit(values)}
            onFinishFailed={() => console.log("yeet failed")}
            autoComplete="off"
          >
            <Form.Item label="Role" name="role">
              <Input placeholder="Search by role" defaultValue="Software Engineer" />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Input placeholder="Search by location" defaultValue="Manchester" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
          <Divider />
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
