import TextInput from '@/components/inputs/text-input/TextInput';
import Select from '@/components/select/Select';
import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

const JourneyLocationPicker = ({ routeType }: { routeType: string }) => {
  const { control, watch } = useFormContext();

  const renderLocationPicker = (
    type: string,
    selectFieldName: string,
    customFieldName: string,
    label: string,
  ) => {
    const selectedValue = watch(selectFieldName);

    return (
      <div
        role="group"
        aria-labelledby={`${type}-location`}
        className="flex flex-col gap-8"
      >
        <h3 className="pb-8 text-16 font-500 leading-[25.6px] text-grey-600-sub">
          {label}
        </h3>
        <div className="flex flex-col gap-8">
          <Controller
            name={selectFieldName}
            control={control}
            render={({ field }) => (
              <Select
                options={[
                  '청주터미널',
                  '청주역',
                  '청주공항',
                  '기타 (직접 입력)',
                ]}
                value={field.value}
                setValue={(value) => {
                  field.onChange(value);
                  if (value !== '기타 (직접 입력)') {
                    field.onChange(value);
                  }
                }}
                isUnderLined={true}
                placeholder={`희망 ${type} 장소를 선택해주세요`}
              />
            )}
          />

          {selectedValue === '기타 (직접 입력)' && (
            <Controller
              name={customFieldName}
              control={control}
              render={({ field }) => (
                <TextInput
                  name={customFieldName}
                  setValue={field.onChange}
                  value={field.value}
                  placeholder={`희망 ${type} 장소를 입력해주세요`}
                />
              )}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      className="flex flex-col gap-[16px] px-16 py-28"
      aria-label="desired boarding/disembarkation location"
    >
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        희망 탑승/하차 장소를 입력하세요
      </h2>
      {(routeType === '왕복행' || routeType === '콘서트행') &&
        renderLocationPicker(
          '하차',
          'concertDisembarkationSelect',
          'concertDisembarkationCustom',
          '희망 하차 장소 (콘서트행)',
        )}
      {(routeType === '왕복행' || routeType === '귀가행') &&
        renderLocationPicker(
          '하차',
          'homeDisembarkationSelect',
          'homeDisembarkationCustom',
          '희망 하차 장소 (귀가행)',
        )}
    </section>
  );
};

export default JourneyLocationPicker;
