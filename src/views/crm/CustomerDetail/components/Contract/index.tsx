import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik'
import * as Yup from 'yup'
import { Button, FormItem, Input } from '@/components/ui'
import { useLocation } from 'react-router-dom'
import { apiGetCrmProjectMakeContract } from '@/services/CrmService'
import CreatableSelect from 'react-select/creatable'

interface FormValues {
    client: string
    client_email: []
    client_name: []
    client_phone: []
    project_name: string
    site_address: string
    date: string
    city: string
    type: string
    franchises: string
    quotation: string
    cost: number
    design_charges_per_sft: number
    cover_area_in_sft: number
    terrace_and_balcony_charges_per_sft: number
    terrace_and_balcony_area_in_sft: number
}

const validationSchema = Yup.object().shape({
    client: Yup.string().required('Required'),
    project_name: Yup.string().required('Required'),
    site_address: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    city: Yup.string().required('Required'),
    quotation: Yup.string().required('Required'),
    cost: Yup.number().required('Required'),
    type: Yup.string().required('Required'),

    design_charges_per_sft: Yup.number().test(
        'is-residential',
        'Required',
        function (value) {
            const { type } = this.parent
            return type === 'residential' ? value != null : true
        },
    ),

    cover_area_in_sft: Yup.number().test(
        'is-residential',
        'Required',
        function (value) {
            const { type } = this.parent
            return type === 'residential' ? value != null : true
        },
    ),

    terrace_and_balcony_charges_per_sft: Yup.number().test(
        'is-residential',
        'Required',
        function (value) {
            const { type } = this.parent
            return type === 'residential' ? value != null : true
        },
    ),

    terrace_and_balcony_area_in_sft: Yup.number().test(
        'is-residential',
        'Required',
        function (value) {
            const { type } = this.parent
            return type === 'residential' ? value != null : true
        },
    ),
})



const Index = () => {
    const typeOptions = [
      { value: 'commercial', label: 'Commercial' },
      { value: 'residential', label: 'Residential' },
  ]
    const handleSubmit = async (values: FormValues) => {
        console.log(values)

        const response = await apiGetCrmProjectMakeContract(values)
        const responseData = await response.json()
        window.open(responseData.data, '_blank')
        console.log(responseData)
        console.log(values)
    }
    const animatedComponents = makeAnimated()

    return (
        <Formik
            initialValues={{
                client: '',
                client_email: [],
                client_name: [],
                client_phone: [],
                project_name: '',
                site_address: '',
                date: '',
                city: '',
                type:  '',
                franchises: '',
                quotation: '',
                cost: 0,
                design_charges_per_sft: 0,
                cover_area_in_sft: 0,
                terrace_and_balcony_charges_per_sft: 0,
                terrace_and_balcony_area_in_sft: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
        >
            {({ isSubmitting,values }) => (
                <>
                    <h3 className="mb-4">Contract</h3>

                    <Form className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <FormItem label="Client">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="client"
                                    size="sm"
                                />
                                <ErrorMessage
                                    name="client"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Client Email">
                                <Field name="client_email">
                                    {({ field, form }: FieldProps) => (
                                        <CreatableSelect
                                            isMulti
                                            components={animatedComponents}
                                            onChange={(value) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value.map((v) => v.value),
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
                                        <CreatableSelect
                                            isMulti
                                            components={animatedComponents}
                                            onChange={(value) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value.map((v) => v.value),
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
                                        <CreatableSelect
                                            isMulti
                                            components={animatedComponents}
                                            onChange={(value) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value.map((v) => v.value),
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
                                    size="sm"
                                />
                                <ErrorMessage
                                    name="project_name"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Type">
                              <Field name="type">
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
                            <FormItem label="Site Address">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="site_address"
                                    size="sm"
                                />
                                <ErrorMessage
                                    name="site_address"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Date">
                                <Field
                                    component={Input}
                                    type="date"
                                    name="date"
                                    size="sm"
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
                                    size="sm"
                                />
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Franchises">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="franchises"
                                    size="sm"
                                />
                                <ErrorMessage
                                    name="franchises"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            <FormItem label="Quotation">
                                <Field
                                    component={Input}
                                    type="text"
                                    name="quotation"
                                    size="sm"
                                />
                                <ErrorMessage
                                    name="quotation"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>
                            {values.type === 'commercial' && (
                            <FormItem label="Cost">
                                <Field
                                    component={Input}
                                    type="number"
                                    name="cost"
                                    size="sm"
                                />
                                <ErrorMessage
                                    name="cost"
                                    component="div"
                                    className=" text-red-600"
                                />
                            </FormItem>)}
                           
            {values.type === 'residential' && (
                <>
                  <FormItem label="Design Charges per SFT">
                    <Field
                        component={Input}
                        type="number"
                        name="design_charges_per_sft"
                        size="sm"
                    />
                    <ErrorMessage
                        name="design_charges_per_sft"
                        component="div"
                        className=" text-red-600"
                    />
                </FormItem>
                <FormItem label="Cover Area in SFT">
                    <Field
                        component={Input}
                        type="number"
                        name="cover_area_in_sft"
                        size="sm"
                    />
                    <ErrorMessage
                        name="cover_area_in_sft"
                        component="div"
                        className=" text-red-600"
                    />
                </FormItem>
                <FormItem label="Terrace and Balcony Charges per SFT">
                    <Field
                        component={Input}
                        type="number"
                        name="terrace_and_balcony_charges_per_sft"
                        size="sm"
                    />
                    <ErrorMessage
                        name="terrace_and_balcony_charges_per_sft"
                        component="div"
                        className=" text-red-600"
                    />
                </FormItem>
                <FormItem label="Terrace and Balcony Area in SFT">
                    <Field
                        component={Input}
                        type="number"
                        name="terrace_and_balcony_area_in_sft"
                        size="sm"
                    />
                    <ErrorMessage
                        name="terrace_and_balcony_area_in_sft"
                        component="div"
                        className=" text-red-600"
                    />
                </FormItem>
                </>
            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="solid"
                        >
                            Submit
                        </Button>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default Index
