import { useEffect, useState } from 'react';
import useMountTransition from '~/utils/useMountTransition';

function ModalSelectBox({ options, setSelected, selected, edit, toggleEdit, alt }) {
  const [active, setActive] = useState(false);
  const [newOptions, setNewOptions] = useState(options);

  const hasTransitionedIn = useMountTransition(active, 200);

  useEffect(() => {
    setNewOptions(options.filter((option) => option !== selected).sort());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setNewOptions(options.filter((option) => option !== selected).sort());
    // eslint-disable-next-line
  }, [selected]);

  useEffect(() => {
    if (!edit) {
      setActive(false);
    }
  }, [edit]);

  return (
    <button
      onClick={() => {
        setActive((prevState) => {
          return !prevState;
        });
        toggleEdit();
      }}
      className={
        (active && edit ? 'border-primary' : 'border-gray-100') +
        ' w-[500px] flex items-center py-3 px-5 relative border border-solid rounded-[5px]'
      }
    >
      <div className="flex justify-between w-full">
        <p className={(active && edit ? 'text-primary' : ' text-black') + ' font-inter font-medium leading-6 pointer'}>
          {selected ? selected : `-- ${alt} --`}
        </p>
        <img src={active ? '/images/icons/arrow-active.svg' : '/images/icons/arrow-inactive.svg'} alt="" />
      </div>
      {(active || hasTransitionedIn) && (
        <div className={`select-box ${hasTransitionedIn && 'in'} ${active && 'visible'}`}>
          {newOptions.map((option, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setSelected(option)}
                className="py-2 text-left pl-5 w-full text-mainText font-inter font-semibold leading-6 hover:bg-gray-200 hover:text-primary"
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
}

export default ModalSelectBox;
