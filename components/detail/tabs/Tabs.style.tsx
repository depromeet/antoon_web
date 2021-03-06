import styled from '@emotion/styled';

const TabsWrapper = styled.div`
  position: relative;
  margin: -14rem 0 -14px;
  width: 100%;
  height: 36px;
  font-size: 13px;
`;
const Tabs = styled.div`
  position: relative;
  width: 100%;
  height: 36px;
  font-size: 13px;
`;

const TabsHeader = styled.div`
  display: flex;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.basic.white};
  padding: 10px 10px 10px 2px;

  & .active {
    font-weight: 800;
  }
`;

const Tab = styled.div`
  position: relative;
  transition: all 300ms ease-in-out;
  opacity: 0.6;
  z-index: 10;
  cursor: pointer;
  padding: 3px 10px;
  width: 25%;
  text-align: center;
  color: '#000';
  font-weight: 400;
  font-style: normal;
  -webkit-tap-highlight-color: transparent;
`;

const TabIndicator = styled.div`
  position: absolute;
  top: 4px;
  left: 6px;
  transition: all 300ms ease-in-out;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.grayscale.gray_200};
  width: 22%;
  height: 34px;
`;

export { TabsWrapper, Tabs, TabsHeader, Tab, TabIndicator };
