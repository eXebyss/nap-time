'use client';

import moment from 'moment';
import { useState } from 'react';

const useNapTimeCard = (start: string, finish: string) => {
    const today = moment().format('YYYY-MM-DD');
    const startTime = moment(start).format('HH:mm:ss');
    const finishTime = moment(finish).format('HH:mm:ss');

    const startDateTime = moment(`${today} ${startTime}`);
    const finishDateTime = moment(`${today} ${finishTime}`);

    const midnightDateTime = moment(`${today} 00:00:00`);

    let napDuration;

    if (moment(start).isSame(finish, 'day')) {
        napDuration = parseFloat(
            finishDateTime.diff(startDateTime, 'hours', true).toFixed(2),
        );
    } else {
        napDuration = parseFloat(
            finishDateTime.diff(midnightDateTime, 'hours', true).toFixed(2),
        );
    }

    const [isCardModalOpen, setCardModalOpen] = useState(false);

    const openCardModal = () => {
        setCardModalOpen(true);
    };

    const closeCardModal = () => {
        setCardModalOpen(false);
    };

    return {
        napDuration,
        isCardModalOpen,
        openCardModal,
        closeCardModal,
    };
};

export default useNapTimeCard;
