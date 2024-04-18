import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function projectsFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/crm/projects`, (schema) => {
        return schema.db.salesDashboardData[0]
    })

    server.post(`${apiPrefix}/crm/projects`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody)
        const { pageIndex, pageSize, sort, query } = body
        const { order, key } = sort
        const products = schema.db.projectdata
        const sanitizeProducts = products.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeProducts
        let total = products.length

        if ((key === 'category' || key === 'name') && order) {
            data.sort(
                sortBy(key, order === 'desc', (a) =>
                    (a as string).toUpperCase()
                )
            )
        } else {
            data.sort(sortBy(key, order === 'desc', parseInt as Primer))
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.del(
        `${apiPrefix}/crm/projects/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            schema.db.projectdata.remove({ id })
            return true
        }
    )

    server.get(`https://col-back1.test.psi.initz.run/v1/api/admin/getall/lead/`, (schema, { queryParams }) => {
        const id = queryParams.id
        const product = schema.db.projectdata.find(id)
        return product
    })

    server.put(
        `${apiPrefix}/crm/projects/update`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            const { id } = data
            schema.db.projectdata.update({ id }, data)
            return true
        }
    )

    server.post(
        `${apiPrefix}/crm/projects/create`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            schema.db.projectdata.insert(data)
            return true
        }
    )

    server.get(`${apiPrefix}/sales/orders`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const order = queryParams['sort[order]']
        const key = queryParams['sort[key]']
        const orders = schema.db.ordersData
        const sanitizeProducts = orders.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeProducts
        let total = orders.length

        if (key) {
            if (
                (key === 'date' ||
                    key === 'status' ||
                    key === 'paymentMehod') &&
                order
            ) {
                data.sort(sortBy(key, order === 'desc', parseInt as Primer))
            } else {
                data.sort(
                    sortBy(key, order === 'desc', (a) =>
                        (a as string).toUpperCase()
                    )
                )
            }
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, parseInt(pageSize), parseInt(pageIndex))

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.del(
        `${apiPrefix}/sales/orders/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            id.forEach((elm: string) => {
                schema.db.ordersData.remove({ id: elm })
            })
            return true
        }
    )

    server.get(
        `${apiPrefix}/sales/orders-details`,
        (schema, { queryParams }) => {
            const { id } = queryParams
            const orderDetail = schema.db.orderDetailsData
            orderDetail[0].id = id
            return orderDetail[0]
        }
    )
}
