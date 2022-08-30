import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Facebook,
  Reddit,
  Linkedin,
  Twitter,
  ShareIcon,
} from 'components/icons';
import styled from 'styled-components';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Box,
} from '@opub-cdl/design-system';

const Share: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();

  useEffect(() => {
    if (navigator.share) {
      document.getElementById('share-native')?.removeAttribute('hidden');
    }
  }, []);

  function shareButtonHandler() {
    // check if web share api is supported
    if (navigator.share) {
      navigator.share({
        text: title,
        url: window.location.href,
      });
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            css={{ display: 'flex', alignItems: 'center' }}
            variant={'outline'}
          >
            Share
            <Box css={{ marginLeft: '8px', fontSize: 0 }}>
              <ShareIcon fill="#1D7548" />
            </Box>
          </Button>
        </PopoverTrigger>

        <PopoverContent hideArrow sideOffset={1}>
          <ShareComp className="shareModal__dropdown">
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.facebook.com/sharer.php?u=https://constituencyv2.openbudgetsindia.org${router.asPath}`.replaceAll(
                  '&',
                  '%26'
                )}
              >
                <Facebook />
                <span>Facebook</span>
                <span className="sr-only"> :opens in new window</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?url=https://constituencyv2.openbudgetsindia.org${router.asPath}`.replaceAll(
                  '&',
                  '%26'
                )}
              >
                <Twitter />
                <span>Twitter</span>
                <span className="sr-only"> :opens in new window</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.linkedin.com/sharing/share-offsite/?mini=true&url=https://constituencyv2.openbudgetsindia.org${router.asPath.replaceAll(
                  '=',
                  '%3D'
                )}`}
              >
                <Linkedin />
                <span>LinkedIn</span>
                <span className="sr-only"> :opens in new window</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.reddit.com/submit?url=https://constituencyv2.openbudgetsindia.org${router.asPath}`.replaceAll(
                  '&',
                  '%26'
                )}
              >
                <Reddit />
                <span>Reddit</span>
                <span className="sr-only"> :opens in new window</span>
              </a>
            </li>
            <li id="share-native" hidden>
              <button onClick={() => shareButtonHandler()}>
                <Box css={{ marginRight: '8px', fontSize: 0 }}>
                  <ShareIcon fill="#4965B2" />
                </Box>
                <span>Share via...</span>
              </button>
            </li>
          </ShareComp>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Share;

const ShareComp = styled.ul`
  background-color: #fff;
  border: 1px solid #cdd1d1;
  box-shadow: 1px solid #eff2f2;

  a,
  button {
    font-weight: 500 !important;
    font-size: 0.875rem;
    color: hsla(0, 0%, 0%, 0.87);
    line-height: 1.75;
    padding: 8px 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    text-decoration-color: transparent;

    svg {
      width: 18px;
      pointer-events: none;
      margin-left: 0;
    }

    &:hover {
      text-decoration-color: currentColor;
      background-color: #eee;
    }

    span {
      width: max-content;
    }
  }
`;
