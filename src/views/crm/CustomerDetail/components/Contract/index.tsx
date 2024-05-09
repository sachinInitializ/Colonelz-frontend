import React, { SyntheticEvent, useEffect, useState } from 'react'

import makeAnimated from 'react-select/animated'
import { Formik, Field, Form, ErrorMessage, FieldProps, useFormikContext, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, DatePicker, FormItem, Input, InputGroup, Select } from '@/components/ui'
import { useLocation } from 'react-router-dom'
import { apiGetCrmProjectMakeContract } from '@/services/CrmService'
import CreatableSelect from 'react-select/creatable'

interface FormValues {
    project_type: string;
    contract_type: string;
    client_name: [];
    client_email: [];
    client_phone: [];
    project_name: string;
    site_address: string;
    date: string;
    city: string;
    quotation: string;
    design_stage: string[];
    number: [string,string,string];
    design_charges: string;
    discount: string;
    design_charges_per_sft: string;
    design_cover_area_in_sft: string;
    balcony_charges_per_sft: string;
    balcony_area_in_sft: string;
    terrace_covered_charges_per_sft: string;
    terrace_covered_area_in_sft: string;
    terrace_open_charges_per_sft: string;
    terrace_open_area_in_sft: string;
}

const validationSchema = Yup.object().shape({
    // project_name: Yup.string().required('Required'),
    // site_address: Yup.string().required('Required'),
    // date: Yup.date().required('Required'),
    // city: Yup.string().required('Required'),
    // quotation: Yup.string().required('Required'),
    // cost: Yup.number().required('Required'),
    // type: Yup.string().required('Required'),

    // design_charges_per_sft: Yup.number().test(
    //     'is-residential',
    //     'Required',
    //     function (value) {
    //         const { type } = this.parent
    //         return type === 'residential' ? value != null : true
    //     },
    // ),

    // cover_area_in_sft: Yup.number().test(
    //     'is-residential',
    //     'Required',
    //     function (value) {
    //         const { type } = this.parent
    //         return type === 'residential' ? value != null : true
    //     },
    // ),

    // terrace_and_balcony_charges_per_sft: Yup.number().test(
    //     'is-residential',
    //     'Required',
    //     function (value) {
    //         const { type } = this.parent
    //         return type === 'residential' ? value != null : true
    //     },
    // ),

    // terrace_and_balcony_area_in_sft: Yup.number().test(
    //     'is-residential',
    //     'Required',
    //     function (value) {
    //         const { type } = this.parent
    //         return type === 'residential' ? value != null : true
    //     },
    // ),
})

const Index = () => {
    const handleSubmit = async (values: FormValues) => {
        console.log(values)
      console.log(values.date);
      values.date = new Date(values.date).toISOString().split('T')[0]
      console.log(values.date);
      
        
        const response = await apiGetCrmProjectMakeContract(values)
        const responseData = await response.json()
        window.open(responseData.data, '_blank')
        console.log(responseData)
        console.log(values)
    }
    return (
        <Formik
        initialValues={{
            project_type: '',
            contract_type: '',
            client_email: [],
            client_name: [],
            client_phone: [],
            project_name: '',
            site_address: '',
            date: '',
            city: '',
            quotation: '',
            design_stage: [],
            number: ["","",""],
            design_charges: '',
            discount: '',
            design_charges_per_sft: '',
            design_cover_area_in_sft: '',
            balcony_charges_per_sft: '',
            balcony_area_in_sft: '',
            terrace_covered_charges_per_sft: '',
            terrace_covered_area_in_sft: '',
            terrace_open_charges_per_sft: '',
            terrace_open_area_in_sft: '',
        }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
        >
        <FormContent />
      </Formik>
    );
  };

  function NumericInput({ field, form }: { field: any, form: FormikProps<any> }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (/^\d*$/.test(inputValue)) {
        form.setFieldValue(field.name, inputValue);
      }
    };
  
    return (
      <Input
        type='text'
        onChange={handleChange}
        placeholder="Enter numbers only"
      />
    );
  }

const FormContent = () => {
    const { setFieldValue, values } = useFormikContext<FormValues>();
    type OptionType = { label: string; value: string; };
    const typeOptions:OptionType[] = [
      { value: 'commercial', label: 'Commercial' },
      { value: 'residential', label: 'Residential' },
  ]


  const numberOption=[
    {value:"1",label:"1"},
    {value:"2",label:"2"},
    {value:"3",label:"3"},
    {value:"4",label:"4"},
    {value:"5",label:"5"},
  ]
  const contract_type=[
    {value:'Interior design & Implementation',label:'Interior design & Implementation'},
    {value:"Architecture, Construction & Interior Design Implementation",label:"Architecture, Construction & Interior Design Implementation"},
    {value:"Architecture Planning & Interior Design",label:"Architecture Planning & Interior Design"},
    {value:"Interior Design",label:"Interior Design"},
  ]
  const designOptions:OptionType[]=[
    { value: 'Drawing room', label: 'Drawing room' },
    { value: 'Living / Family Louge', label: 'Living / Family Louge' },
    { value: 'Kitchen', label: 'Kitchen' },
    { value: 'Dining area', label: 'Dining area' },
    { value: 'Toilets', label: 'Toilets' },
    { value: 'Bedrooms', label: 'Bedrooms' },
    { value: 'Multipurpose room / Music & dance room / Yoga & meditation room', label: 'Multipurpose room / Music & dance room / Yoga & meditation room' },
    { value: 'Home Office', label: 'Home Office' },
    { value: 'Mandir / Puja', label: 'Mandir / Puja' },
    { value: 'Balconies', label: 'Balconies' },
    { value: 'Terrace', label: 'Terrace' },
    { value: 'Others', label: 'Others' },
  ]

  
  const [checkboxList, setCheckboxList] = useState<(string | number)[]>([])

  const onCheckboxChange = (options: (string | number)[], e: SyntheticEvent) => {
      console.log(options)
      setCheckboxList(options)
  }

    const animatedComponents = makeAnimated()

    return (
  
                <>
                    <h3 className="mb-4">Contract</h3>
                    <Form className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <FormItem label="Project Type">
                              <Field name="project_type">
                                  {({ field, form }: FieldProps) => (
                                      <Select
                                          options={typeOptions}
                                          value={typeOptions.find(option => option.value === field.value)}
                                          onChange={(option) => {
                                              if (option) {
                                                  form.setFieldValue(field.name, option.value);
                                              } else {
                                                  form.setFieldValue(field.name, '');
                                              }
                                          }}
                                      />
                                  )}
                              </Field>
                              <ErrorMessage
                                  name="type"
                                  component="div"
                                  className=" text-red-600"
                              />
                          </FormItem>
                          <FormItem label="Contract Type">
                                <Field name="contract_type">
                                    {({ field, form }: FieldProps) => (
                                        <Select
                                        options={contract_type}
                                        value={contract_type.find(option => option.value === field.value)}
                                        onChange={(option) => {
                                            if (option) {
                                                form.setFieldValue(field.name, option.value);
                                            } else {
                                                form.setFieldValue(field.name, '');
                                            }}
                                        }
                                        />
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="contract_type"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Client Email">
                                <Field name="client_email">
                                    {({ field, form }: FieldProps) => (
                                        <Select
                                            isMulti
                                            className='h-[44px]'
                                            componentAs={CreatableSelect}
                                            components={animatedComponents}
                                            onChange={(value) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value.map((v:any) => v.value),
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(
                                                    field.name,
                                                    true,
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="client_email"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Client Name">
                                <Field name="client_name">
                                    {({ field, form }: FieldProps) => (
                                        <Select
                                            isMulti
                                            components={animatedComponents}
                                            componentAs={CreatableSelect}
                                            onChange={(value) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value.map((v:any) => v.value),
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(
                                                    field.name,
                                                    true,
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="client_name"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Client Phone">
                                <Field name="client_phone">
                                    {({ field, form }: FieldProps) => (
                                        <Select
                                            isMulti
                                            components={animatedComponents}
                                            componentAs={CreatableSelect}
                                            onChange={(value) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value.map((v:any) =>v.value),
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(
                                                    field.name,
                                                    true,
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="client_phone"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Project Name">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="project_name"
                                    placeholder="Project Name"
                                />
                                <ErrorMessage
                                    name="project_name"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                           
                            <FormItem label="Site Address">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="site_address"
                                    placeholder="Site Address"
                                />
                                <ErrorMessage
                                    name="site_address"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Date">
                            <Field
                            component={({ field, form }: FieldProps) => (
                                <DatePicker
                                field={field}
                                form={form}
                                value={field.value}
                                placeholder="Select Date"
                                onChange={(date) => {
                                    if (date) {
                                        const istDate = new Date(date.getTime() + (330 * 60 * 1000));
                                        const dateString = `${istDate.getUTCFullYear()}-${String(istDate.getUTCMonth() + 1).padStart(2, '0')}-${String(istDate.getUTCDate()).padStart(2, '0')}`;
                                        const finalDate = new Date(dateString);
                                        form.setFieldValue(field.name, finalDate);
                                        console.log(finalDate);
                                        
                                    }
                                  }}
                                />
                            )}
                            type="date"
                            name="date"
                            />
                                <ErrorMessage
                                    name="date"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="City">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                />
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem> 
                            <FormItem label="Quotation">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="quotation"
                                    placeholder="Quotation"
                                />
                                <ErrorMessage
                                    name="quotation"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label='Design Stage'>
                            <Field name='design_stage'>
                            {({ field,form }:any) => (
                                <Select
                                    isMulti
                                    options={designOptions}
                                    name='design_stage'
                                    onChange={
                                        (option)=>form.setFieldValue(field.name,option.map((v:OptionType)=>v.value))}

                                     />
                            )}
                             </Field>
                            </FormItem>
                      {values.design_stage.includes('Toilets') &&
                            <FormItem label="Toilet No.">
                                <Field>
                                {({ field,form }:any) => (
                                    <Select
                                    options={numberOption}
                                    name='toiletnumber'
                                    onChange={(option)=>
                                        {
                                            values.number[2]=option? option.value:''
                                        }
                                    }
                                  />
                                    )}
                                </Field>
                            </FormItem>}
                            {values.design_stage.includes('Bedrooms') &&
                            <FormItem label="Bedroom No.">
                                <Field>
                                {({ field,form }:any) => (
                                    <Select
                                    options={numberOption}
                                    name='bedroomnumber'
                                    onChange={(option)=>{
                                        values.number[0]=option? option.value:''
                                        console.log(values.number);
                                        
                                    }
                                        
                                    }
                                  />
                                    )}
                                </Field>
                            </FormItem>
                            }
                            {values.design_stage.includes('Balconies') &&
                            <FormItem label="Balconies No.">
                                <Field>
                                {({ field,form }:any) => (
                                    <Select
                                    options={numberOption}
                                    name='bedroomnumber'
                                    onChange={(option)=>{
                                        values.number[0]=option? option.value:''
                                        console.log(values.number);
                                        
                                    }
                                        
                                    }
                                  />
                                    )}
                                </Field>
                            </FormItem>
                            }
                            <FormItem label='Design Charges'>
                            <Field name='design_charges'>
                                    {({ field, form }:any) => (
                                    <Input
                                        type='text'
                                        placeholder='Design Charges'
                                        size='md'
                                        onKeyPress={(e) => {
                                            const charCode = e.which ? e.which : e.keyCode;
                                            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                              e.preventDefault();
                                            }
                                          }}
                                        onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        form.setFieldValue(field.name, value);
                                        
                                        }}
                                    />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Discount(%)'>
                                <Field name='discount'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Discount(%)'
                                            
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                                console.log(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Design Charges For Covered Area(in Rs)'>
                                <Field name='design_charges_per_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Design Charges For Covered Area(Rs)'
                                            
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                                console.log(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Covered Area(in SQFT)'>
                                <Field name='design_cover_area_in_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Covered Area(in SQFT)'
                                            
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Design Charges For Balcony Area(in Rs)'>
                                <Field  name='balcony_charges_per_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Design Charges For Balcony Area(in Rs)'
                                           
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Balcony Area(in SQFT)'>
                                <Field name='balcony_area_in_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Balcony Area(in SQFT)'
                                            
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Design Charges For Terrace Covered Area(in Rs)'>
                                <Field name='terrace_covered_charges_per_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Design Charges For Terrace Covered Area(in Rs)'
                                            
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                                </FormItem>
                            <FormItem label='Terrace Covered Area (in SQFT)'>
                                <Field name='terrace_covered_area_in_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Terrace Covered Area (in SQFT)'
                                            
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Design Charges For Terrace Open Area (in Rs)'>
                                <Field name='terrace_open_charges_per_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Design Charges For Terrace Open Area (in Rs)'
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Terrace Open Area (in SQFT)'>
                                <Field name='terrace_open_area_in_sft'>
                                    {({ field, form }: FieldProps) => (
                                        <Input
                                            type='text'
                                            placeholder='Terrace Open Area (in SQFT)'
                                            
                                            size='md'
                                            onKeyPress={(e) => {
                                                const charCode = e.which ? e.which : e.keyCode;
                                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                              onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                form.setFieldValue(field.name, value);
                                              }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                           
                            </div>
                            {/* <FormItem label="Design Stage">
                                <Checkbox.Group value={checkboxList} onChange={onCheckboxChange} className='grid grid-cols-3 gap-5 '>
                                <Checkbox value="Drawing room">Drawing room</Checkbox>
                                <Checkbox value="Living / Family Louge">Living / Family Louge</Checkbox>
                                <Checkbox value="Kitchen">Kitchen</Checkbox>
                                <Checkbox value="Dining area">Dining area</Checkbox>
                                <Checkbox value="Toilets">Toilets</Checkbox>
                                <Checkbox value="Bedrooms">Bedrooms</Checkbox>
                                <Checkbox value="Multipurpose room / Music & dance room / Yoga & meditation room">Multipurpose room / Music & dance room / Yoga & meditation room</Checkbox>
                                <Checkbox value="Home Office">Home Office</Checkbox>
                                <Checkbox value="Mandir / Puja">Mandir / Puja</Checkbox>
                                <Checkbox value="Balconies">Balconies</Checkbox>
                                <Checkbox value="Terrace">Terrace</Checkbox>
                                <Checkbox value="Others">Others- please specify</Checkbox>
                            </Checkbox.Group>
                            </FormItem>
                        */}
                        <Button
                            type="submit"
                            variant="solid"
                        >
                            Submit
                        </Button>
                    </Form>
                </>
            
    )
}

export default Index
