import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { CardData } from "../types";

const CardButton = (props: {
  singleFetchedCard: CardData;
  setSelectedCard: (value: CardData | null) => void;
}) => {
  //   const [isSelected, setIsSelected] = useState(false);

  const { setSelectedCard } = props;

  const cardButtonHandler = () => {
    // setIsSelected(true);
    setSelectedCard(props.singleFetchedCard);
  };
  const { card } = props.singleFetchedCard;

  return (
    <Button
      variant="outlined"
      className="w-100 d-flex flex-column align-items-start gap-5"
      onClick={cardButtonHandler}
    >
      <div className="w-100 d-flex justify-content-between">
        <span>**** **** **** {card.last4}</span>
        {card.brand === "visa" ? (
          <FontAwesomeIcon icon={faCcVisa} className="h3" />
        ) : (
          <FontAwesomeIcon icon={faCcMastercard} className="h3" />
        )}
      </div>
      <div className="w-100 d-flex justify-content-between gap-5">
        <span>
          Exp. {card.exp_month} / {card.exp_year}{" "}
        </span>
        <span>CVC: ***</span>
      </div>
    </Button>
  );
};

export default CardButton;
