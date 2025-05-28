import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SearchSchema = Yup.object().shape({
  search: Yup.string()
    .min(2, 'En az 2 karakter giriniz')
    .required('Arama terimi gereklidir')
});

const SearchBar = ({ onSearch, initialValue = "", placeholder = "Ara..." }: { onSearch: (searchTerm: string) => void, initialValue?: string, placeholder?: string }) => {
  return (
    <Formik
      initialValues={{ search: initialValue }}
      validationSchema={SearchSchema}
      onSubmit={(values) => onSearch(values.search)}
    >
      {({ isSubmitting }) => (
        <Form className="w-full">
          <div className="relative w-full">
            <Field
              type="text"
              name="search"
              placeholder={placeholder}
              className="w-full py-2 px-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              🔍
            </button>
          </div>
          
          <div style={{ minHeight: '24px' }}>
            <ErrorMessage name="search" component="div" className="text-red-500 text-sm mt-1" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;