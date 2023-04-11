import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QuestionRatingModel } from 'survey-core';
import PropertyEditor from '../PropertyEditor';

interface IProps {
  data?: QuestionRatingModel;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (data?: any) => void;
}

interface IRating {
  minRateDescription?: string;
  maxRateDescription?: string;
  rateMax: number;
}

const RatingEditor: React.FC<IProps> = ({ data, onUpdate }) => {
  const [minText, setMinText] = useState(data?.minRateDescription);
  const [maxText, setMaxText] = useState(data?.maxRateDescription);
  const [maxRate, setMaxRate] = useState<number>(
    data?.rateMax ?? data?.rateValues.length ?? 5
  );

  useEffect(() => {
    if (data === undefined) return;
    data.minRateDescription = minText ?? '';
    data.maxRateDescription = maxText ?? '';
    data.rateMax = maxRate;
    const rates: number[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= maxRate; i++) {
      rates.push(i);
    }
    data.rateValues = rates;
    // eslint-disable-next-line consistent-return
    return () => {
      onUpdate?.(data);
    };
  }, [data, maxRate, maxText, minText, onUpdate]);

  return (
    <Box>
      <PropertyEditor
        name="maxRate"
        displayName="评分范围"
        tooltip="允许的最大评分"
        initValue={maxRate}
        binding={setMaxRate}
        sx={{ mt: 2 }}
        numeric
      />
      <PropertyEditor
        name="minText"
        displayName="最小值文本"
        tooltip="显示在最小值旁的说明文本"
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
