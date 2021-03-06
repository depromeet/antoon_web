import { useRouter } from 'next/router';
import { StartButtonWrapper } from './StartButton.style';

type Props = {
  isAllEssentialChecked: boolean;
};

function StartButton(props: Props) {
  const { isAllEssentialChecked } = props;
  const router = useRouter();

  const onStart = () => {
    isAllEssentialChecked && router.replace('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <StartButtonWrapper
        isAllEssentialChecked={isAllEssentialChecked}
        onClick={onStart}
      >
        μμνκΈ°
      </StartButtonWrapper>
    </div>
  );
}

export default StartButton;
