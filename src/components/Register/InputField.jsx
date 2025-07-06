import React, { useEffect, useRef, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';

const InputField = ({ id, icon, label, type = 'text', ...props }) => (
    <div className="flex gap-3 relative">
      <FloatLabel>
        <InputText id={id} type={type} {...props}  />
        <label htmlFor={id} className='!text-white'>{label}</label>
      </FloatLabel>
      <i className={`bi ${icon} text-2xl absolute right-0`}></i>
    </div>
  );
  

export default InputField