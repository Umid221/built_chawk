import BrandCard from '@components/common/brand-card';
import SectionHeader from '@components/common/section-header';
import BrandCardLoader from '@components/ui/loaders/brand-card-loader';
// import { useBrandsQuery } from '@framework/brand/get-all-brands';
import Alert from '@components/ui/alert';
import {useCategoriesQuery} from '@framework/category/get-all-categories';
import {useEffect, useState} from "react";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../constantas/consts";

interface BrandProps {
  sectionHeading: string;
  className?: string;
  limit?: number;
  variant?: '6column' | '4column';
}

const BrandGridBlock: React.FC<BrandProps> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
  sectionHeading,
  variant = '4column',
  limit = 16,
}) => {
  // const { data, isLoading, error } = useBrandsQuery({
  //   limit: limit,
  // });
  const [branch, setBranch] = useState<any>({})
  useEffect(() => {
    let a = localStorage.getItem(LOCALSTORAGE_BRANCH)
    let category = localStorage.getItem(LOCALSTORAGE_CATEGORY)
    // @ts-ignore
    let b = JSON.parse(a)
    if (b && category === PICKUP) {
      setBranch({branchId:b.id})

    } else {
      setBranch({})
    }
  },[])

  const { data, isLoading, error } = useCategoriesQuery({branch});

  // const brands = data?.brandsGrid;
  const columnClasses =
    variant === '4column'
      ? 'grid-cols-2 sm:grid-cols-4'
      : 'grid-cols-2 sm:grid-cols-4 2xl:grid-cols-6';
  // @ts-ignore
  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div
          className={`grid ${columnClasses} gap-2.5 md:gap-3 lg:gap-5 xl:gap-7`}
        >
          {isLoading
            ? Array.from({ length: limit }).map((_, idx) => (
                <BrandCardLoader key={idx} uniqueKey={`top-brand-${idx}`} />
              ))
            : data?.map((brand) => (
                  <BrandCard key={`brand--key${brand.id}`} brand={brand} />
                ))}
        </div>
      )}
    </div>
  );
};

export default BrandGridBlock;
