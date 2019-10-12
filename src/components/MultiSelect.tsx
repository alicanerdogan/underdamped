import React, { memo } from "react";
import styled from "@emotion/styled";
import { colors, shadow } from "utils/styles";
import { Spring } from "wobble";

export interface MultiSelectProps {
  options: { label: string; value: string | number }[];
}

const OptionLabel = styled.p`
  height: 48px;
  padding: 8px 16px;
  color: ${colors.gray[800]};
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Option = styled.div`
  position: relative;
  height: 48px;

  &:hover {
    cursor: pointer;
  }
`;

const SelectedOptionLabel = styled(OptionLabel)`
  color: ${colors.white};
`;

const SelectedOptionContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
  pointer-events: none;
`;

const SelectedOptionIndicator = styled.div`
  height: 48px;
  background: ${colors.blue[500]};
  will-change: transform;
  overflow: hidden;
`;

export const MultiSelectStyle = styled.div`
  position: relative;
  width: 320px;
  border-radius: 16px;
  background: ${colors.white};
  overflow: hidden;
  box-shadow: ${shadow.lg};

  ${SelectedOptionIndicator} {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
  }
`;

function recursiveAnimate(
  animation: Spring,
  callback: (value: number, isAtRest: boolean) => void
) {
  window.requestAnimationFrame(() => {
    callback(animation.currentValue, animation.isAtRest);
    if (animation.isAnimating) {
      recursiveAnimate(animation, callback);
      return;
    }
  });
}

const STIFFNESS = 250;
const DAMPING = 20;

export const MultiSelect: React.FC<MultiSelectProps> = memo(
  ({ options }: MultiSelectProps) => {
    const selectedIndexIndicatorRef = React.useRef<HTMLDivElement>();
    const selectedOptionLabelRef = React.useRef<HTMLParagraphElement>();
    const selectedIndexRef = React.useRef(-1);
    const animationRef = React.useRef<Spring>();

    const onItemSelected = React.useCallback((index: number) => {
      const prevSelectedIndex = selectedIndexRef.current;
      selectedIndexRef.current = index;

      const selectedIndexIndicatorEl = selectedIndexIndicatorRef.current;
      const selectedOptionLabelEl = selectedOptionLabelRef.current;
      if (!selectedIndexIndicatorEl || !selectedOptionLabelEl) {
        return;
      }

      const toValue = 48 * index;

      if (animationRef.current) {
        animationRef.current.stop();
        const initialVelocity = animationRef.current.currentVelocity;
        const fromValue = animationRef.current.currentValue;
        const animation = new Spring({
          initialVelocity,
          fromValue,
          toValue,
          stiffness: STIFFNESS,
          damping: DAMPING
        });
        animationRef.current = animation;
        animation.start();
      } else {
        const fromValue = 48 * prevSelectedIndex;
        const animation = new Spring({
          fromValue,
          toValue,
          stiffness: STIFFNESS,
          damping: DAMPING
        });
        animationRef.current = animation;
        animation.start();
      }

      recursiveAnimate(animationRef.current, (value, isAtRest) => {
        selectedIndexIndicatorEl.style.transform = `translateY(${value}px)`;
        selectedOptionLabelEl.style.transform = `translateY(${-value}px)`;

        if (isAtRest) {
          animationRef.current = undefined;
        }
      });
    }, []);
    const transform = `translateY(${48 * selectedIndexRef.current}px)`;

    return (
      <MultiSelectStyle>
        <SelectedOptionIndicator
          style={{ transform }}
          ref={el => (selectedIndexIndicatorRef.current = el || undefined)}
        >
          <SelectedOptionContent
            ref={el => (selectedOptionLabelRef.current = el || undefined)}
          >
            {options.map((option, index) => (
              <SelectedOptionLabel key={option.value}>
                {option.label}
              </SelectedOptionLabel>
            ))}
          </SelectedOptionContent>
        </SelectedOptionIndicator>
        {options.map((option, index) => (
          <Option key={option.value} onClick={() => onItemSelected(index)}>
            <OptionLabel>{option.label}</OptionLabel>
          </Option>
        ))}
      </MultiSelectStyle>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
