import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input, { InputProps } from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps, FieldInputProps } from 'formik'
import { DatePicker, Select } from '@/components/ui'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { ComponentType } from 'react'
import OrganizationFields from '@/views/sales/ProductForm/OrganizationFields'

type FormFieldsName = {
    name: string
    productCode: string
    description: string
    number:string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors } = props

    const NumericFormatInput = ({
        onValueChange,
        ...rest
    }: Omit<NumericFormatProps, 'form'> & {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        form: any
        field: FieldInputProps<unknown>
    }) => {
        return (
            <NumericFormat
                customInput={Input as ComponentType}
                type="text"
                autoComplete="off"
                onValueChange={onValueChange}
                {...rest}
            />
        )
    }

    const NumberInput = (props: InputProps) => {
        return <Input {...props} value={props.field.value} />
    }
    const projectStatus = [
        { value: 'followUp', label: 'Follow Up' },
        { value: 'interested', label: 'Interested' },
        { value: 'notInterested', label: 'Not Interested' },
        { value: 'noResponse', label: 'No Response' },
    ]

    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic lead information</p>
            <FormItem
                label="Client Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Emailsssss"
                invalid={(errors.productCode && touched.productCode) as boolean}
                errorMessage={errors.productCode}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="email"
                    placeholder="Proejct Type"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Phone"
                invalid={(errors.productCode && touched.productCode) as boolean}
                errorMessage={errors.productCode}
            >
                <Field
                    type="number"
                    autoComplete="off"
                    name="phone"
                    placeholder="Phone"
                    component={Input}
                />
            </FormItem>
{/* 
            <FormItem
                        label="Project Id"
                        invalid={(errors.number && touched.number) as boolean}
                        errorMessage={errors.number}
                    >
                        <Field name="id">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <NumericFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Stock"
                                        customInput={
                                            NumberInput as ComponentType
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem> */}


        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                <FormItem
                label="Location"
                invalid={(errors.productCode && touched.productCode) as boolean}
                errorMessage={errors.productCode}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="leadmanager"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
                    </div>
                    <div className='col-span-1'>
                    <FormItem
                label="Source"
                invalid={(errors.productCode && touched.productCode) as boolean}
                errorMessage={errors.productCode}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="source"
                    placeholder="Source"
                    component={Input}
                />
            </FormItem>
                    </div>
                    </div>
                    <FormItem
                label="Project Type"
                invalid={(errors.productCode && touched.productCode) as boolean}
                errorMessage={errors.productCode}
            >
                  <Select
                placeholder="Project Status"
                options={projectStatus}
            ></Select>
            </FormItem>
                  


                    <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        
        </AdaptableCard>
    )
}

export default BasicInformationFields
