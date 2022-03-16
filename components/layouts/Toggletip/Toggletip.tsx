import { handleToggleClick } from './toggletip.helper';
import styled from 'styled-components';

const Toggletip = ({ data }) => {
  return (
    <ToggletipWrapper>
      <button
        type="button"
        data-toggletip-content={data}
        onClick={(e) => handleToggleClick(e)}
        aria-pressed="false"
        className="toggle__button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path
            fill="#ABB0B0"
            d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.6 9H5.4V5.4h1.2V9Zm0-4.8H5.4V3h1.2v1.2Z"
          />
        </svg>
        {/* <span className="sr-only">More info</span> */}
      </button>
      <span role="status"></span>
    </ToggletipWrapper>
  );
};

export default Toggletip;

export const ToggletipWrapper = styled.span`
	position: relative;

	.toggle__button {
		&[aria-pressed='true'] {
			+ [role='status'] {
				opacity: 100;
				width: 212px;
			}
		}

		svg {
			pointer-events: none;
		}
	}

	[role='status'] {
		position: absolute;
		max-width: 50vw;
		font-weight: 600;
		font-size: 12px;
		line-height: 133%;
		padding: 10px 12px;
		background-color: #666D6E;
		color: hsl(0, 33%, 99%);
		border: 1px solid #666D6E;
		border-radius: 8px;
		bottom: 150%;
		left: -8px;
		z-index: 10;
		opacity: 0;
		width: 0;
		isolation: isolate;

		&::before {
			border-left: 0.8em solid transparent;
			border-right: 0.8em solid transparent;
			border-top: 0.8em solid #666D6E;
			bottom: -0.8em;
			content: ' ';
			height: 0;
			left: 8px;
			width: 0;
			position: absolute;
			z-index: 9;
		}
	}
`