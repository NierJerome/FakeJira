import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";

/**
 * grid 和 flex 各自的应用场景
 * 1.要考虑是一位布局还是二维布局
 * 一般 一位布局 用flex 二维布局用 grid
 * 2.是从内容出发 还是从布局出发
 * 从内容出发（flex）：你先有一组数据（数量不固定） 希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发（grid ）：先规划网格，然后填充元素
 * @constructor */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)``;
const HeaderLeft = styled(Row)``;

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
