import Button from '@/components/UI/Button/Button';
import { MdDateRange, MdEdit, MdDelete, MdSave } from 'react-icons/md';
import Input from '../Input/Input';
import Toast from '../Toast/Toast';
import useNapTimeRecord from './useNapTimeRecord';
import { NapTimeRecordProps } from './types';

const NapTimeRecord = ({ napTime, index }: NapTimeRecordProps) => {
    const {
        state: {
            isOpen,
            isTimeFormOpen,
            isDateFormOpen,
            napTimeStart,
            napTimeFinish,
            napDateStart,
            napDateFinish,
            successMessage,
        },
        timeEdit,
        dateEdit,
        dispatch,
        setNapTimeStart,
        setNapTimeFinish,
        setNapDateStart,
        setNapDateFinish,
        updateNapTime,
        updateNapDate,
        deleteData,
    } = useNapTimeRecord(napTime);

    const timeForm = (
        <>
            <label className="label">
                <span className="label-text">Nap time start:</span>
            </label>
            <Input
                type="time"
                onChange={(e) =>
                    dispatch({
                        type: setNapTimeStart,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
            <label className="label">
                <span className="label-text">Nap time finish:</span>
            </label>
            <Input
                type="time"
                onChange={(e) =>
                    dispatch({
                        type: setNapTimeFinish,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
        </>
    );

    const dateForm = (
        <>
            <label className="label">
                <span className="label-text">Nap date start:</span>
            </label>
            <Input
                type="date"
                onChange={(e) =>
                    dispatch({
                        type: setNapDateStart,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
            <label className="label">
                <span className="label-text">Nap date finish:</span>
            </label>
            <Input
                type="date"
                onChange={(e) =>
                    dispatch({
                        type: setNapDateFinish,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
        </>
    );

    const napTimeForm = (isOpen || isTimeFormOpen) && (
        <div className="flex flex-col">
            {timeForm}
            {isDateFormOpen && dateForm}
            {isTimeFormOpen
                ? napTimeStart &&
                  napTimeFinish && (
                      <Button
                          type="button"
                          onClick={() =>
                              updateNapTime(
                                  napTime,
                                  napTimeStart,
                                  napTimeFinish,
                              )
                          }
                          classes="btn-ghost"
                      >
                          <MdSave className="w-12 h-12" />
                      </Button>
                  )
                : napTimeStart &&
                  napTimeFinish &&
                  napDateStart &&
                  napDateFinish && (
                      <Button
                          type="button"
                          onClick={() =>
                              updateNapDate(
                                  napTime,
                                  napDateStart,
                                  napDateFinish,
                                  napTimeStart,
                                  napTimeFinish,
                              )
                          }
                          classes="btn-ghost"
                      >
                          <MdSave className="w-12 h-12" />
                      </Button>
                  )}
        </div>
    );

    const successToast = successMessage && (
        <Toast type="success" message={successMessage} />
    );

    return (
        <>
            <div className="card fhd:w-96 my-2 fhd:my-4">
                <div className="card-body p-4">
                    <div className="card-actions justify-end">
                        {(isOpen || isTimeFormOpen) && (
                            <Button
                                type="button"
                                classes="btn-ghost my-0"
                                onClick={dateEdit}
                            >
                                <MdDateRange className="w-4 h-4" />
                            </Button>
                        )}
                        <Button
                            type="button"
                            classes="btn-ghost my-0"
                            onClick={timeEdit}
                        >
                            <MdEdit className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            classes="btn-ghost my-0"
                            onClick={() => deleteData(index)}
                        >
                            <MdDelete className="w-4 h-4" />
                        </Button>
                    </div>
                    {isOpen || isTimeFormOpen ? (
                        napTimeForm
                    ) : (
                        <>
                            <p>Start: {napTime.start}</p>
                            <p>Finish: {napTime.finish}</p>
                        </>
                    )}
                </div>
            </div>
            {successToast}
        </>
    );
};

export default NapTimeRecord;
