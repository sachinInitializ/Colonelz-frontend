import React from 'react';
import { HiPlusCircle, HiEye, HiPencilAlt, HiTrash } from 'react-icons/hi';
import classNames from 'classnames';
import { Segment } from '@/components/ui';

type Permission = 'create' | 'read' | 'update' | 'delete';

type SelectorProps = {
    field: any;
    form: any;
};

const permissions: Permission[] = ['create', 'read', 'update', 'delete'];

const icons = {
    create: <HiPlusCircle className="text-xl" />,
    read: <HiEye className="text-xl" />,
    update: <HiPencilAlt className="text-xl" />,
    delete: <HiTrash className="text-xl" />
};

const Selector = ({ field, form }: SelectorProps) => {

    const handleChange = (permission: Permission) => {
        const newValue = field.value.includes(permission)
            ? field.value.filter((p: Permission) => p !== permission)
            : [...field.value, permission];

        form.setFieldValue(field.name, newValue);
    };

    return (
        <Segment className="gap-2 md:flex-row flex-col">
            {permissions.map((perm) => (
                <Segment.Item
                    key={perm}
                    value={perm}
                    type="button"
                    onClick={() => handleChange(perm)}
                    className={classNames(
                        'flex items-center !rounded-md cursor-pointer',
                        field.value.includes(perm)
                            ? perm === 'create' ? 'bg-green-200 text-green-700' :
                              perm === 'read' ? 'bg-blue-200 text-blue-700' :
                              perm === 'update' ? 'bg-yellow-200 text-yellow-700' :
                              'bg-red-200 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                    )}
                >
                    {icons[perm]}
                    {perm}
                </Segment.Item>
            ))}
        </Segment>
    );
};

export default Selector;
