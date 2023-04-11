import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QuestionRatingModel } from 'survey-core';
import PropertyEditor from '../PropertyEditor';

interface IProps {
  data?: QuestionRatingModel;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (data?: any) => void;
}

export interface IRating {
  minRateDescription?: string;
  maxRateDescription?: string;
  rates: any[];
}

const RatingEditor: React.FC<IProps> = ({ data, onUpdate }) => {
  const [minText, setMinText] = useState(data?.minRateDescription);
  const [maxText, setMaxText] = useState(data?.maxRateDescription);
  const [maxRate, setMaxRate] = useState<number>(
    data?.rateMax ?? data?.rateValues.length ?? 5
  );

  useEffect(() => {
    return () => {
      const rates: number[] = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= maxRate; i++) {
        rates.push(i);
      }
      const info: IRating = {
        minRateDescription: minText,
        maxRateDescription: maxText,
        rates,
      };

      if (data !== undefined) {
        console.log(`Update rating data: ${data.name}`);
        data.minRateDescription = minText ?? '';
        data.maxRateDescription = maxText ?? '';
        data.rateMax = maxRate;
        data.rateValues = rates;
      }
      onUpdate?.(info);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <PropertyEditor
        name="maxRate"
        displayName="评分范围"
        tooltip="允许的最大评分"
        initValue={maxRate}
        binding={setMaxRate}
        autoFocus
        numeric
      />
      <PropertyEditor
        name="minText"
        displayName="最小值文本"
        tooltip="显示在最小值旁的说明文本"
        sx={{ mt: 2 }}
        initValue={minText}
        binding={setMinText}
      />
      <PropertyEditor
        name="maxText"
        displayName="最大值文本"
        tooltip="显示在最大值旁的说明文本"
        initValue={maxText}
        binding={setMaxText}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default RatingEditor;
