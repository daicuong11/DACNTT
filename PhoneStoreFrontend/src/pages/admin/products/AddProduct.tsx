import { useGetBrands } from '@/hooks/querys/brand';
import { useGetCategories } from '@/hooks/querys/category';
import { useAddProduct } from '@/hooks/querys/product';
import { ProductRequestType } from '@/types/product.type';
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from 'react-hook-form';
import Card from "../components/Card";
import InputField from "../components/InputField";
import Select from "../components/Select";
import SubmitButton from '../components/SubmitButton';

export default function AddProduct() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProductRequestType>();


    const { data: brands } = useGetBrands();
    const { data: categories } = useGetCategories();

    const brandOptions = brands?.data.map((brand) => ({
        label: brand.name,
        value: brand.brandId,
    }));

    const categoryOptions = categories?.data.map((category) => ({
        label: category.name,
        value: category.categoryId,
    }));

    const addProductMutation = useAddProduct();
    const onSubmit = (data: ProductRequestType) => {
        addProductMutation.mutate(data, {

        });
    };

    return (
        <>
            <Card title='Thêm Sản Phẩm'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <InputField {...register("name", { required: true })} label="Tên sản phẩm" id="name" name="name" type="text" />
                        <Select
                            options={categoryOptions ?? []}
                            placeholder="Choose an option"
                            label="Danh mục"
                            onSelect={(option) => setValue("categoryId", option.value)}
                        />
                        <Select
                            options={brandOptions ?? []}
                            placeholder="Choose an option"
                            label="Thương hiệu"
                            onSelect={(option) => setValue("brandId", option.value)}
                        />
                    </div>
                    <Editor
                        apiKey={import.meta.env.VITE_API_KEY_TINY}
                        init={{
                            plugins: [
                                // Core editing features
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                // Your account includes a free trial of TinyMCE premium features
                                // Try the most popular premium features until Feb 19, 2025:
                                'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                            ],
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        }}
                        onEditorChange={(newValue) => setValue('description', newValue)}
                    />
                    <div className="flex justify-end px-4 py-3 text-right border-t">
                        <SubmitButton disabled={isSubmitting} text="Thêm sản phẩm" />
                    </div>
                </form>
            </Card>
        </>
    )
}
